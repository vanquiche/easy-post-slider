<?php
function hex_to_rgb($hex, $opacity)
{
  list($r, $g, $b) = sscanf($hex, '#%02x%02x%02x');
  return "rgba($r, $g, $b, $opacity)";
}
