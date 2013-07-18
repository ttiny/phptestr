function CoverageLink ( link ) {
	link.on( 'click', function () {
		var coverage = link.getData();
		app.view.sourceview.load( coverage.file );
		app.view.sourceview.highlight( coverage.lines );
	} );
}

function CloseCoverageButton ( button ) {
	button.on( 'click', function () {
		app.view.removeView( app.view.sourceview );
		app.view.removeView( app.view.coverageview );
	} );
}

function CoverageButton ( button ) {
	button.on( 'click', function ( e ) {
		var sourceview = new SourceView().setState( 'active' );
		var coverageview = new CoverageView( sourceview, button.getData() );
		app.view.addView( sourceview, 'first' );
		app.view.addView( coverageview );
		app.view.sourceview = sourceview;
		app.view.coverageview = coverageview;
		e.stopPropagation();
	} );
}

function CoverageView ( sourceview, result ) {
	View.Panel.call( this );
	this.setClass( 'CoverageView' );
	this.addView( $T( 'Tmpl.CoverageView', result ) );
	sourceview.load( result.Script );
	sourceview.highlight( _getCoverageFiles( result, true )[result.Script] );
}

CoverageView.extend( View.Panel );