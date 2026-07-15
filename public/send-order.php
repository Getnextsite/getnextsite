<?php
// ---------------------------------------------------------------------------
// GetNextSite Agency — order intake endpoint
// Static-safe: works on Hostinger shared hosting (PHP), no Node.js required.
// Receives client-side POST from the order form and delivers via PHP mail().
// ---------------------------------------------------------------------------

// ---- CORS -----------------------------------------------------------------
$allowed_origins = [
  'https://getnextsite.com',
  'https://www.getnextsite.com',
];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowed_origins, true)) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Vary: Origin');
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  header('Access-Control-Max-Age: 600');
}

// ---- Preflight ------------------------------------------------------------
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
  http_response_code(204);
  exit;
}

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// ---- Method guard ---------------------------------------------------------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false]);
  exit;
}

// ---- Body: JSON first, form-encoded fallback ------------------------------
$raw = file_get_contents('php://input');
$data = null;
if (is_string($raw) && $raw !== '') {
  $decoded = json_decode($raw, true);
  if (is_array($decoded)) {
    $data = $decoded;
  }
}
if (!is_array($data)) {
  $data = $_POST;
}

// ---- Helpers --------------------------------------------------------------
function gns_clean($value, $max_len) {
  if (!is_string($value)) {
    $value = is_scalar($value) ? (string)$value : '';
  }
  $value = trim(strip_tags($value));
  if (function_exists('mb_strlen')) {
    if (mb_strlen($value, 'UTF-8') > $max_len) return null;
  } else {
    if (strlen($value) > $max_len) return null;
  }
  return $value;
}

// ---- Extract + sanitize ---------------------------------------------------
$name    = gns_clean($data['name']    ?? '', 100);
$email_r = isset($data['email']) && is_string($data['email']) ? trim($data['email']) : '';
$email   = filter_var($email_r, FILTER_VALIDATE_EMAIL);
$phone   = gns_clean($data['phone']   ?? '', 30);
$plan    = gns_clean($data['plan']    ?? '', 300);
$message = gns_clean($data['message'] ?? '', 3000);
$website = isset($data['website']) ? (string)$data['website'] : '';

// ---- Honeypot: silent drop (return success so bots don't retry) -----------
if ($website !== '') {
  echo json_encode(['success' => true]);
  exit;
}

// ---- Required-field guard -------------------------------------------------
if ($name === null || $name === '' || $email === false || $plan === null) {
  http_response_code(400);
  echo json_encode(['success' => false]);
  exit;
}

// ---- Header injection guard on the from-domain fields --------------------
foreach ([$name, $email, $phone, $plan] as $val) {
  if (is_string($val) && preg_match('/[\r\n]/', $val)) {
    http_response_code(400);
    echo json_encode(['success' => false]);
    exit;
  }
}

// ---- Compose email --------------------------------------------------------
$to      = 'contact@getnextsite.com';
// From MUST be the domain mailbox — Hostinger blocks foreign From addresses.
$from    = 'contact@getnextsite.com';
$replyto = $email;

$subject_raw = 'New Order — ' . $name . ' (' . $plan . ')';
// Base64 UTF-8 encode so Arabic / French / accented names don't break subject.
$subject = '=?UTF-8?B?' . base64_encode($subject_raw) . '?=';

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ua = isset($_SERVER['HTTP_USER_AGENT']) ? substr((string)$_SERVER['HTTP_USER_AGENT'], 0, 200) : 'unknown';
$now = date('Y-m-d H:i:s T');

$body  = "New order received on getnextsite.com\n";
$body .= str_repeat('-', 46) . "\n\n";
$body .= "Name:    " . $name . "\n";
$body .= "Email:   " . $email . "\n";
$body .= "Phone:   " . ($phone !== '' ? $phone : '—') . "\n";
$body .= "Plan:    " . $plan . "\n\n";
$body .= "Message:\n";
$body .= ($message !== '' ? $message : '—') . "\n\n";
$body .= str_repeat('-', 46) . "\n";
$body .= "Received: " . $now . "\n";
$body .= "IP:       " . $ip . "\n";
$body .= "UA:       " . $ua . "\n";

$headers  = "From: " . $from . "\r\n";
$headers .= "Reply-To: " . $replyto . "\r\n";
$headers .= "Return-Path: " . $from . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Envelope sender must match the domain (Hostinger requirement).
$ok = @mail($to, $subject, $body, $headers, '-f' . $from);

echo json_encode(['success' => (bool)$ok]);
