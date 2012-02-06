#!/usr/bin/env perl

use strict;
use warnings;
use Furl;
use File::Basename qw/fileparse/;

use constant NODECAN_URL => 'http://127.0.0.1:3003';

my $extensions = {
  pl => 'perl',
  pm => 'perl',
  js => 'javascript',
  html => 'html',
  tmpl => 'html',
  txt => 'text',
};

die 'missing arguments' if scalar(@ARGV) == 0;
my $filepath = $ARGV[0];

# check file
die "file doesn't exist" unless -f $filepath;

# read file
open(my $fh, '<', $filepath) or die;
my $body = '';
while (<$fh>){
  $body .= $_;
}
close($fh);

# check extension
my ($filename, $directories, $suffix) = fileparse($filepath, qr/\.[^.]*$/);
die "file name doesn't match" unless length($suffix) > 0;

my $syntax = 'text';
my $extension = substr($suffix, 1);
if (exists($extensions->{$extension})) {
  $syntax = $extensions->{$extension};
}

# post file
my $furl = Furl->new(agent => 'Madoka-Magica/chu-2');
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

my $bin_url = NODECAN_URL . $content;
print $bin_url . "\n";

exit;

