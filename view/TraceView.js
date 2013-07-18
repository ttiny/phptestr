function TraceLink ( link ) {
	link.on( 'click', function () {
		var trace = link.getData();
		app.view.sourceview.load( trace.file );
		app.view.sourceview.highlight( trace.line, true );
	} );
}

function CloseTraceButton ( button ) {
	button.on( 'click', function () {
		app.view.removeView( app.view.sourceview );
		app.view.removeView( app.view.traceview );
	} );
}

function TraceButton ( button ) {
	button.on( 'click', function ( e ) {
		var sourceview = new SourceView().setState( 'active' );
		var traceview = new TraceView( sourceview, button.getData() );
		app.view.addView( sourceview, 'first' );
		app.view.addView( traceview );
		app.view.sourceview = sourceview;
		app.view.traceview = traceview;
	} );
}

function TraceView ( sourceview, trace ) {
	View.Panel.call( this );
	this.setClass( 'TraceView' );
	this.addView( $T( 'Tmpl.TraceView', trace ) );
	sourceview.load( trace[0].file );
	sourceview.highlight( trace[0].line, true );
}

TraceView.extend( View.Panel );