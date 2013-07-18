function TraceView ( sourceview, trace ) {
	View.Panel.call( this );
	this.addView( $T( 'Tmpl.TraceView', trace ) );
	sourceview.load( trace[0].file );
	sourceview.highlight( trace[0].line );
}

TraceView.extend( View.Panel );