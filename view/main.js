"use strict";

var BASEURL = location.href.replace( /\?.*/, '' );
var QUERY = _queryParams();
var TARGET = encodeURIComponent( QUERY.target );
var FILTER = QUERY.filter;



function _getCoverageFiles ( result, casei ) {
	var ret = {};
	var i = (casei === true ? result.Cases.length - 1 : casei);
	for (; i >= 0; --i ) {
		if ( casei !== true && i !== casei ) {
			continue;
		}
		var casea = result.Cases[i];
		if ( casea.Coverage === undefined ) {
			continue;
		}
		for ( var key in casea.Coverage ) {
			if ( ret[key] === undefined ) {
				ret[key] = casea.Coverage[key];
			}
			else {
				ret[key] = ret[key].concat( casea.Coverage[key] );
			}
		}
	}
	return ret;
}


function ExtractButton ( button ) {
	button.on( 'click', function ( e ) {
		window.open( this.getData() );
		e.stopPropagation();
	} );
}


function _onTitleClick ( e ) {
	var item = this.findParentView( '.AccordionItem' );
	item.setState( 'active', !item.hasState( 'active' ) );
	e.stopPropagation();
}



//test script view
function TestScriptResult ( script, result ) {
	View.AccordionItem.call( this );
	
	var extract = BASEURL + '?target=' + TARGET + '&filter=' + encodeURIComponent( script );
	if ( result.Args !== undefined ) {
		extract += '&args=' + encodeURIComponent( result.Args )
	}
	
	var hascoverage = false;
	if ( result.Cases !== undefined ) {
		for ( var i = result.Cases.length - 1; i >= 0; --i ) {
			if ( result.Cases[i].Coverage ) {
				hascoverage = true;
				break;
			}
		}
	}
	var title = $T( 'Tmpl.Title', {
		Script: script,
		Args: result.Args,
		Url: FILTER == script ? null : extract,
		Coverage: hascoverage, Result: result 
	} );
	title.on( 'click', _onTitleClick );
	
	var content = '';

	if ( result.Echo !== undefined ) {
		content += $TT( 'Tmpl.Echoes', result.Echo );
	}
	if ( result.Errors !== undefined ) {
		for ( var i = result.Errors.length - 1; i >= 0; --i ) {
			var error = result.Errors[i];
			error.Script = result.Script;
			if ( error.Details !== undefined && error.Details.Case !== undefined ) {
				result.Cases[ error.Details.Case - 1 ].Failed = error;
			}
			else {
				content += $TT( 'Tmpl.Error', error );
			}
		}
	}
	if ( result.Cases !== undefined ) {
		content += $TT( 'Tmpl.Cases', result.Cases.filter( function ( casea ) { return casea.Failed !== undefined; } ) );
		content += $TT( 'Tmpl.Cases', result.Cases.filter( function ( casea ) { return casea.Failed === undefined; } ) );
	}
	content = new View.HtmlArea( content );

	this.addView( title );
	this.addView( content );

	if ( FILTER == script || result.Errors !== undefined || result.Echo !== undefined ) {
		this.setState( 'active' );
	}
}

TestScriptResult.extend( View.AccordionItem );

	













	

function OnScriptRunResult ( script, result ) {
	app.view
	        .findView( result.Errors !== undefined ? '#Failed' : '#Passed' )
	        .addView( new TestScriptResult( script, result ) );
}


var app = new App();
app.view = $T( 'Tmpl.AppView' );

//window.addEventListener( 'beforeunload', function () {
//	App.include( '/exit', 'js' );
//} );