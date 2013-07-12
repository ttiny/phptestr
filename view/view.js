function queryParams (str) {
	if(typeof str != 'string' || str.length == 0) str = location.search;
	if(str.charAt(0) == '?') str = str.substr(1);
	var params = str.split('&');
	var ret = {};
	for(var p in params) {
		var param = params[p];
		var kv = param.split('=');
		var key = kv[0];
		var value = kv[1] !== undefined ? decodeURIComponent(kv[1]) : null;
		ret[key] = value;
	}
	return ret;
}

var TARGET = queryParams().target || '.';
var FILTER = queryParams().filter;

function ScriptRunResult ( script, result ) {

	function makeError( code, value, err ) {
		if ( value === undefined && err !== undefined ) {
			value = err.Value;
		}
		$ret = $(
				'<div class="error">' +
					'<div class="code">' + code + '</div>' +
					(value ? '<div class="value"><pre>' + value + '</pre></div>' : '') +
				'</div>'
			);
		if ( err ) {
			var scriptline = '';
			if ( err.File != script ) {
				for ( var i = 0; i < err.Trace.length; ++i ) {
					var trace = err.Trace[i];
					if ( trace.file == script ) {
						scriptline = ' ===> @from <span class="line script">' + trace.line + '</span>';
						break;
					}
				}
				if ( scriptline == '' && err.ExceptionTrace !== undefined ) {
					for ( var i = 0; i < err.ExceptionTrace.length; ++i ) {
						var trace = err.ExceptionTrace[i];
						if ( trace.file == script ) {
							scriptline = ' ===> @from <span class="line script">' + trace.line + '</span>';
							break;
						}
					}
				}
			}
			var trace = ( err.Trace.length ? '<a class="trace" href="#">trace...</a>' : '' ) + ( err.ExceptionTrace !== undefined ? ' <a class="exceptiontrace" href="#">exception...</a>' : '' );
			$(
				'<div class="errdetails">' +
					'<span class="type">' + err.Type + '</span>:' +
					' <span class="file">' + err.File + '</span>' +
					'@<span class="line">' + err.Line + '</span>' +
					scriptline +
					( trace ? ' (' + trace + ')' : '' ) +
				'</div>'
			).appendTo( $ret );
			$ret.find( 'a.trace' ).on( 'click', function () {
				console.log( JSON.stringify( err.Trace, true, 4 ) );
				console.info( err.Trace );
				return false;
			});
			$ret.find( 'a.exceptiontrace' ).on( 'click', function () {
				console.log( JSON.stringify( err.ExceptionTrace, true, 4 ) );
				console.info( err.ExceptionTrace );
				return false;
			});
		}
		return $ret;
	}

	$run = $( '<div class="run" data-name="' + encodeURIComponent(script) + '" />' );

	if ( result.Echo !== undefined ) {
		$echos = $( '<div class="echos" />' );
		for ( var i = result.Echo.length - 1; i >= 0; i-- ) {
			var echo = result.Echo[i];
			if ( echo instanceof Object ) {
				echo = JSON.stringify(echo, true, 4);
			}
			$( '<div class="echo"><pre>' + echo.replace( /</g, '&lt;' ).replace( />/g, '&gt;' ) + '</pre></div>' )
				.prependTo( $echos );
		}
		$echos.appendTo( $run );
	}

	if ( result.Errors !== undefined ) {
		$errors = $( '<div class="errors" />' );
		for ( var i = result.Errors.length - 1; i >= 0; i-- ) {
			var err = result.Errors[i];
			if ( err.Details !== undefined && ( err.Details.Case !== undefined && result.Cases ) ) {
				continue;
			}
			makeError( err.Code, err.Value, err.Details !== undefined ? err.Details.Error : undefined ).prependTo( $errors );
		}
		$errors.appendTo( $run );
	}

	if ( result.Cases !== undefined ) {
		$cases = $( '<div class="cases" />' );
		for ( var i = result.Cases.length - 1; i >= 0; i-- ) {
			$case = $(
					'<div data-name="' + (i + 1) + '" class="case">' +
						'<div class="name">' + (result.Cases[i].Name || ('[unnamed case '+i+']')) + '</div>' +
					'</div>'
				);
			$case.prependTo( $cases );
		}
		$cases.appendTo( $run );
		$( '<div class="clear" />' ).appendTo( $cases );
	}

	var extract = location.href.replace( /\?.*/, '' ) + '?target=' + encodeURIComponent( TARGET ) + '&filter=' + encodeURIComponent( script );
	if ( result.Args !== undefined ) {
		extract += '&args=' + encodeURIComponent( result.Args )
	}
	$name = $( '<div class="name">' + 
					'<span class="script">' + script + '</span>' +
					( result.Args !== undefined ? ' <span class="args">' + result.Args + '</span>' : '' ) +
					'<span class="links"> (<a class="extract" href="' + extract + '" target="_blank">extract...</a>)</span>' + 
				'</div>' );
	$name.find( 'span.script' ).on( 'click', function () {
		$this = $( this );
		$this.closest( '.run' ).toggleClass( 'collapsed' );
		$this.parent().addClass( 'highlight' );
	} );
	$name.on( 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
		$( this ).removeClass( 'highlight' );
	} );
	$run.prepend( $name );
	if ( result.Errors ) {
		$run.appendTo( 'div#failed' );	
	}
	else {
		$run.appendTo( 'div#success' );
		if ( FILTER != script ) {
			if ( result.Echo === undefined ) {
				$run.addClass( 'collapsed' );
			}
		}
	}

	if ( result.Errors !== undefined ) {
		//console.error( result.Errors );
		for ( var i = result.Errors.length - 1; i >= 0; i-- ) {
			var error = result.Errors[i];
			if ( error.Details !== undefined && error.Details.Case !== undefined ) {
				$case = $( 'div.run[data-name="' + encodeURIComponent( script ) + '"] > div.cases > div.case[data-name="' + encodeURIComponent( error.Details.Case ) + '"]' );
				$case.addClass( 'failed' );
				$case.prependTo( $case.parent() );
				$case.find( 'div.name' ).append( $( '<span class="line"> ===> @from <span class="number">' + error.Details.Line + '</span></span>' ) );
				$case.append( makeError( error.Code, error.Value ) );
			}
		}
	}

	//console.log( result );
}