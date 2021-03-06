import { HeroesComponent } from "./heroes.component";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Input, Directive } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";
import { Hero } from "../hero";

describe('HeroesComponent (Deep)', () => {

    @Directive({
        selector: "[routerLink]",
        host: { "(click)": "onClick()" }
    })
    class RouterLinkDirectiveStub {
        @Input('routerLink') linkParams: any;
        navigatedTo: any = null;

        onClick() {
            this.navigatedTo = this.linkParams;
        }
    }

    let fixture: ComponentFixture<HeroesComponent>;
    let heroesComponent;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        HEROES = [
            { id: 1, name: 'pietje', strength: 25 },
            { id: 2, name: 'jantje', strength: 75 },
            { id: 3, name: 'klaasje', strength: 10 }
        ]
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
                RouterLinkDirectiveStub,
                { provide: HeroService, useValue: mockHeroService }
            ]
        })
        fixture = TestBed.createComponent(HeroesComponent);
    })

    it('should render the HeroComponet template for each hero', () => {
        // Arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // Act: run ngOnInit
        fixture.detectChanges();

        // Assert
        const heroComponentDebugElement = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDebugElement.length).toEqual(3);

        for (let i = 0; i < heroComponentDebugElement.length; i++) {
            const element = heroComponentDebugElement[i];

            expect(element.nativeElement.textContent).toContain(HEROES[i].name);
            expect(element.query(By.css('a')).nativeElement.textContent).toContain(HEROES[i].name);
        }
    })

    it('should create a HeroComponent for each hero', () => {
        // Arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // Act: run ngOnInit
        fixture.detectChanges();

        // Assert
        let heroComponentDebugElement = fixture.debugElement.queryAll(By.directive(HeroComponent));
        for (let i = 0; i < heroComponentDebugElement.length; i++) {
            expect(heroComponentDebugElement[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    })

    it(`should call the delete method with the right hero,
     when the delete button of child HeroComponent was clicked`, () => {

        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        spyOn(fixture.componentInstance, 'delete');

        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        const button = heroComponents[0].query(By.css('button'));
        button.triggerEventHandler('click', { stopPropagation: () => { } })

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    })

    it(`should call the delete method with the right hero,
    when the delete.emit() property of child HeroComponent was called`, () => {

        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        spyOn(fixture.componentInstance, 'delete');

        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        (<HeroComponent>heroComponents[0].componentInstance).delete.next(); //emit(undefined);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    })

    it(`should call the delete method with the right hero,
    when the triggerEventHandler on the HeroComponent was called`, () => {

        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        spyOn(fixture.componentInstance, 'delete');

        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponents[0].triggerEventHandler('delete', null); //.delete.next(); //emit(undefined);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    })

    it(`should add a new hero, with the inputted name to the heroes list 
        when add button is clicked` , () => {

        const heroName = "Mr. Hans";
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        mockHeroService.addHero.and.returnValue(of({ id: 5, name: heroName, strength: 33 }));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.query(By.css('#addButton'));

        inputElement.value = heroName;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        // expect(fixture.debugElement.nativeElement.textContent).toContain("Mr. Hans");
        const listElement4 = fixture.debugElement.queryAll(By.css('li'))[3].nativeElement;
        expect(listElement4.textContent).toContain("5 Mr. Hans");
    })

   it('should have the correct route for the first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const firstHero = fixture.debugElement.queryAll(By.directive(HeroComponent))[0];
        const debugElementA = firstHero.query(By.css('a'));

        debugElementA.triggerEventHandler('click', null);
        fixture.detectChanges();

        const routerLink = firstHero
             .query(By.directive(RouterLinkDirectiveStub))
             .injector.get(RouterLinkDirectiveStub);

        expect(routerLink.navigatedTo).toBe("/detail/1");
    })
});