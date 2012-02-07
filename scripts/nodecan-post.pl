#!/usr/bin/env perl

use strict;
use warnings;
use Furl;
use File::Basename qw/fileparse/;
use Encode;
use Encode::Guess qw/euc-jp shiftjis 7bit-jis/;

use constant NODECAN_URL => 'http://127.0.0.1:3003';

my $extensions = {
  txt   => 'text',
  pl    => 'perl',
  pm    => 'perl',
  js    => 'javascript',
  html  => 'html',
  tmpl  => 'html',
  tpl   => 'html',
  xml   => 'xml',
  m     => 'oc',
  java  => 'java',
};

die 'missing arguments' if scalar(@ARGV) == 0;
my $filepath = $ARGV[0];

# check file
die "file doesn't exist" unless -f $filepath;

# read file
my $file_content = read_file($filepath);

# resolve file encoding
my $body = resolve_encoding($file_content);

# check extension
my $syntax = get_syntax($filepath);

# post file
my $bin_url = post_text($body, $syntax);

print $bin_url . "\n";

exit;

# read file
sub read_file {
  my $filepath = shift;

  open(my $fh, '<', $filepath) or die;
  my $file_content = '';
  while (<$fh>){
    $file_content .= $_;
  }
  close($fh);

  return $file_content;
}

# resolve file encoding
sub resolve_encoding {
  my $file_content = shift;

  my $encode = guess_encoding($file_content);
  ref($encode) or die "Can't guess: $encode";
  my $body = $encode->decode($file_content);

  return Encode::encode('utf8', $body);
}

sub get_syntax {
  my $filepath = shift;

  my ($filename, $directories, $suffix) = fileparse($filepath, qr/\.[^.]*$/);
  die "file name doesn't match" unless length($suffix) > 0;

  my $syntax = 'text';
  my $extension = substr($suffix, 1);
  if (exists($extensions->{$extension})) {
    $syntax = $extensions->{$extension};
  }

  return $syntax;
}

sub post_text {
  my $furl = Furl->new(agent => 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7');
  my $res = $furl->request(
    method  => 'POST',
    url     => NODECAN_URL . '/api/add',
    content => {
      body   => $body,
      syntax => $syntax,
    },
  );

  die "request failed" unless $res->code == 200;
  my $content = $res->content;

  return NODECAN_URL . $content;
}

