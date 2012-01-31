var defs = [
  {
    aliases:['text', 'plain'],
    script :'shBrushPlain.js',
    name   :'Text'
  },
  {
    aliases:['applescript'],
    script :'shBrushAppleScript.js',
    name   :'AppleScript'
  },
  {
    aliases:['bash', 'shell'],
    script :'shBrushBash.js',
    name   :'Bash/Shell'
  },
  {
    aliases:['coldfusion', 'cf'],
    script :'shBrushColdFusion.js',
    name   :'ColdFusion'
  },
  {
    aliases:['cpp','c'],
    script :'shBrushCpp.js',
    name   :'C/C++'
  },
  {
    aliases:['c#', 'c-sharp', 'csharp'],
    script :'shBrushCSharp.js',
    name   :'C#'
  },
  {
    aliases:['css'],
    script :'shBrushCss.js',
    name   :'CSS'
  },
  {
    aliases:['delphi', 'pascal'],
    script :'shBrushDelphi.js',
    name   :'Delphi'
  },
  {
    aliases:['diff', 'patch', 'pas'],
    script :'shBrushDiff.js',
    name   :'Diff/Patch'
  },
  {
    aliases:['erl', 'erlang'],
    script :'shBrushDiff.js',
    name   :'Erlang'
  },
  {
    aliases:['groovy'],
    script :'shBrushGroovy.js',
    name   :'Groovy'
  },
  {
    aliases:['java'],
    script :'shBrushJava.js',
    name   :'Java'
  },
  {
    aliases:['jfx', 'javafx'],
    script :'shBrushJavaFX.js',
    name   :'JavaFX'
  },
  {
    aliases:['js','jscript','javascript'],
    script :'shBrushJScript.js',
    name   :'JavaScript'
  },
  {
    aliases:['perl', 'pl'],
    script :'shBrushPerl.js',
    name   :'Perl'
  },
  {
    aliases:['php'],
    script :'shBrushPhp.js',
    name   :'PHP'
  },
 {
    aliases:['py', 'python'],
    script :'shBrushPython.js',
    name   :'Python'
  },
  {
    aliases:['ruby', 'rails', 'ror', 'rb'],
    script :'shBrushRuby.js',
    name   :'Ruby'
  },
  {
    aliases:['sass', 'scss'],
    script :'shBrushSass.js',
    name   :'Sass'
  },
  {
    aliases:['scala'],
    script :'shBrushScala.js',
    name   :'Scala'
  },
  {
    aliases:['sql'],
    script :'shBrushSql.js',
    name   :'SQL'
  },
  {
    aliases:['vb', 'vbnet'],
    script :'shBrushVb.js',
    name   :'Visual Basic'
  },
  {
    aliases:['xml','xslt'],
    script :'shBrushXml.js',
    name   :'XML/XSLT'
  },
  {
    aliases:['html','xhtml'],
    script :'shBrushXml.js',
    name   :'HTML/XHTML'
  },
  {
    aliases:['applescript'],
    script :'shBrushAppleScript.js',
    name   :'AppleScript'
  },
  {
    aliases:['oc'],
    script :'shBrushObjC.js',
    name   :'Objective-C'
  }
];

function path(script_name) {
  return '/syntax/scripts/' + script_name;
}

function create_alias_map(syntax_defs) {
  var ret = {};
  var i,j,entry;
  for (i=0; i<syntax_defs.length; i++) {
    entry = syntax_defs[i];
    for (j=0; j<entry.aliases.length; j++) {
      ret[entry.aliases[j]] = path(entry.script);
    }
  }
  return ret;
}

var alias_map = create_alias_map(defs);

exports.aliases = alias_map;
exports.defs = defs;
exports.get_script = function(alias) {
  if (alias_map[alias]){
    return alias_map[alias];
  } else {
    return alias_map.text;
  }
};
