import { Component, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';		
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Google Books Finder';

    constructor(
    	public iconRegistry: MdIconRegistry,
    	private sanitizer: DomSanitizer
    ){
    	this.registerIcons();
    }

	private registerIcons(){		
		this.iconRegistry.addSvgIcon(		
			'thumbs-up',		
			this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/thumbs-up.svg')		
		);		
	}
}
