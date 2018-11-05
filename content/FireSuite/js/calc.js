// Calc
//--------------------------------------------------------------------------------------
var calc = {

	// create private sandbox for calcultor.
	sandbox: function (str) {
		this.box = new Components.utils.Sandbox('about:blank');
		var result = Components.utils.evalInSandbox(str, this.box);
		return result;
	},
	
	run: function(str) {
		
		switch(str) {
			
			case 'C':
			case 'c':
			case 'CE':
			case 'ce':
			gui.set('calcinput','');
			gui.set('calcoutput','');		
			break;
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
			gui.append('calcinput',str);
			inp = gui.get('calcinput');
			if(inp.length >=2) {
				check = (inp.length-2);
				if(inp.substr(check,1) == '(') {
				gui.append('calcinput',')');
				}
			}
			break;
			
			case '/':
			gui.append('calcinput','/');		
			break;			
			case '*':		
			gui.append('calcinput','*');	
			break;
			case '-':
			gui.append('calcinput','-');		
			break;
			case '.':
			gui.append('calcinput','.');		
			break;
			case '+':
			gui.append('calcinput','+');		
			break;

			case 'E':	
			gui.append('calcinput',' Math.E ');	
			break;
			case 'LN10':	
			gui.append('calcinput',' Math.LN10 ');	
			break;
			case 'LN2':	
			gui.append('calcinput',' Math.LN2 ');	
			break;
			case 'LOG10E':	
			gui.append('calcinput',' Math.LOG10E ');	
			break;

			case 'LOG10E':	
			gui.append('calcinput',' Math.LOG10E ');	
			break;
			case 'LOG2E':	
			gui.append('calcinput',' Math.LOG2E ');	
			break;			
			case 'PI':	
			gui.append('calcinput',' Math.PI ');	
			break;
			case 'SQRT2':	
			gui.append('calcinput',' Math.SQRT2 ');	
			break;	
			case 'SQRT1_2':	
			gui.append('calcinput',' Math.SQRT1_2 ');	
			break;			
			
			case 'abs':	
			gui.append('calcinput',' Math.abs(');	
			break;
			case 'acos':
			gui.append('calcinput',' Math.acos(');		
			break;
			case 'asin':	
			gui.append('calcinput',' Math.asin(');	
			break;
			case 'atan':	
			gui.append('calcinput',' Math.atan(');	
			break;
			case 'atan2':	
			gui.append('calcinput',' Math.atan2(');		
			break;
			case 'ceil':
			gui.append('calcinput',' Math.ceil(');			
			break;
			case 'cos':		
			gui.append('calcinput',' Math.cos(');	
			break;
			case 'exp':	
			gui.append('calcinput',' Math.exp(');		
			break;
			case 'floor':		
			gui.append('calcinput',' Math.floor(');	
			break;
			case 'log':
			gui.append('calcinput',' Math.log(');				
			break;
			case 'max':	
			gui.append('calcinput',' Math.max(');	
			break;
			case 'min':	
			gui.append('calcinput',' Math.min(');	
			break;
			case 'pow':	
			gui.append('calcinput',' Math.pow(');	
			break;
			case 'rand':
			gui.append('calcinput',' Math.random(');		
			break;
			case 'round':
			gui.append('calcinput',' Math.round(');		
			break;
			case 'sin':	
			gui.append('calcinput',' Math.sin(');	
			break;
			case 'sqrt':
			gui.append('calcinput',' Math.sqrt(');		
			break;
			case 'tan':	
			gui.append('calcinput',' Math.tan(');	
			break;
			case '=':
			gui.set('calcoutput',globals.sandbox(gui.get('calcinput')));		
			break;			
		}
	}
};