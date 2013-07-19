function TraceLink ( link ) {
	link.on( 'click', function () {
		var trace = link.getData();
		var panels = Panels.getView();
		panels.sourceview.load( trace.file, trace.line, true );
	} );
}

function CloseTraceButton ( button ) {
	button.on( 'click', function () {
		var panels = Panels.getView();
		panels.removeView( panels.sourceview );
		panels.removeView( panels.traceview );
		panels.setState( 'active', false );
	} );
}

function TraceButton ( button ) {
	button.on( 'click', function ( e ) {
		var sourceview = new SourceView().setState( 'active' );
		var traceview = new TraceView( sourceview, button.getData() );
		var panels = Panels.getView();
		panels.addView( sourceview, 'first' );
		panels.addView( traceview );
		panels.sourceview = sourceview;
		panels.traceview = traceview;
		panels.setState( 'active' );
	} );
}

function TraceView ( sourceview, trace ) {
	View.Panel.call( this );
	this.setClass( 'TraceView' );
	this.setLayout( 'VerticalFlex' );
	this.addView( $T( 'Tmpl.TraceView', trace ) );
	sourceview.load( trace[0].file, trace[0].line, true );
	//sourceview.setState( 'info' );
}

TraceView.extend( View.Panel );