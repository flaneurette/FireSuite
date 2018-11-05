// RegExp's
//--------------------------------------------------------------------------------------
	
var REGEXP = {

	0: {reg: /txt|nfo|gif|jpg|jpeg|png|apng|ico|tif|tiff|bmp|ai|psd|wav|au|mp2|mp3|mp4|mid|midi|ra|ram|rm|avi|mpg|mpeg|fla|asf|asx|mov|vrml|rtf|doc|docx|odt|pdf|ppt|xls|bin|exe|gz|gzip|tar|zip|7z|rar|jszip|jar|cab|pdf|css/ig, 		        type:'unwanted'},
    1:  {reg: /\.(gif|jpg|jpeg|png|apng|ico|tif|tiff|bmp|ai|psd)/ig,	type:'images'},
    2:  {reg: /\.(wav|au|mp2|mp3|mp4|mid|midi|ra|ram|rm)/ig,			type:'audio'},
	3:  {reg: /\.(avi|mpg|mpeg|fla|asf|asx|swf|mov|vrml)/ig,			type:'media'},
    4:  {reg: /\.(rtf|doc|docx|odt|pdf|ppt|xls)/ig,						type:'documents'},
	5:  {reg: /\.(bin|exe|gz|gzip|tar|zip|7z|rar|jszip|jar|cab|pdf)/ig,	type:'binary'},
	6:  {reg: /\.(xml|xbm|rss|)/ig,										type:'xml'},
	7:  {reg: /\.(js|asp|jsp|php|cgi|pl|rb|cfm)/ig,						type:'script'},
	8:  {reg: /\.(html|js|css)/ig,										type:'html'},
	9:  {reg: /\.(arj|cdf|cdr|cmx|dir|dxr|dcr|hqx|htx|idc|la|lma)/ig,	type:'various'},
   	10: {reg: /\.(txt|nfo)/ig,											type:'text'},
  	11: {reg: /(htt(ps|p):\/\/|www.)/gim,								type:'uri all'},
   	12: {reg: /(htt(ps|p):\/\/|www.)/gim,								type:'uri'},  
   	13: {reg: /href\s*=\s*(\"([^"]*\")|'[^']*'|([^'">\s]+))/gim,		type:'hyperlinks'},
   	14: {reg: /\n\n/ig,													type:'newlines'},
   	15: {reg: /\r\n|\r|\n/ig,											type:'newlines'},
   	16: {reg: /\t/ig,													type:'tab'},

   	50: {reg: /(\s\s|\n|\r|\t|\/\*.*\*\/)/gim,							type:'lines'},
   	51: {reg: /return/gim,												type:'return'},
	52: {reg: /var\s+/gim,												type:'var'},
	53: {reg: /if\s+\(/gim,												type:'logic'},
	54: {reg: /while\s+\(/gim,											type:'function'},
	55: {reg: /function/gim,											type:'function'},
	56: {reg: /[\s\\x]/g,												type:'hex'},
	57: {reg: /rgb\(|\)/gi,												type:'rgb'},
	58: {reg: /(<\/?[^>]+>)/gi,											type:'tags'},
	59: {reg: /&nbsp;/gi,												type:'nb'},
	60: {reg: /<br\s*\/>/gi,											type:'br'},
	61: {reg: /(Components\.|eval|toSource|alert|document|window\.)/gim,type:'security'},
	62: {reg: /(chrome|file|opera|res|data|telnet|about|resource|acrobat|localhost|loopback|127\.|192\.)\s*(:|\.)/gim,	
																		type:'security'},
	63: {reg: /(while|for|space|block|memory).*unescape\(("|')(%[0-9]|\\x|\\u)([a-z]|[0-9])("|')\)/gim,					
																		type:'security'},
	64: {reg: /\(|\)/,													type:'bracktes'},
	65: {reg: /http:\/\//gi,											type:'http'}

};