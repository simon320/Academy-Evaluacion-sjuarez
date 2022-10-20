import { Directive, Input, OnInit, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[emptyImg]',
})
export class DefaultImgDirective implements OnInit {
  @Input() valueImg!: string;
  
  constructor(
    private elementRef: ElementRef,
    private render: Renderer2,
  ) {}

  ngOnInit(): void {
    this.setImg();
  }

  setImg(): void {
    if (this.valueImg === '') {
      this.render.setProperty(
        this.elementRef.nativeElement,
        'src',
        '../../../assets/defaultImg.jpg'
      );
    }
  }
}
