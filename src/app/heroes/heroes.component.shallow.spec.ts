import { HeroesComponent } from "./heroes.component";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, Input, Output, Component } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";

describe('HeroesComponent (shallow)', () => {

    let fixture: ComponentFixture<HeroesComponent>;
    let heroesComponent;
    let mockHeroService;
    let HEROES;

    @Component({
        selector: 'app-hero',
        template: '<div></div>',
        styleUrls: []
    })
    class FakeHeroComponent {
        @Input() hero: Hero;
        // @Output() delete = new EventEmitter();
    }

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'pietje', strength: 25 },
            { id: 2, name: 'jantje', strength: 75 },
            { id: 3, name: 'klaasje', strength: 10 }
        ]

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                FakeHeroComponent
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ]
        })
        fixture = TestBed.createComponent(HeroesComponent);
        heroesComponent = fixture.componentInstance;
    })

    it('should populate the heroes array when heroService.getHeroes is called', () => {
        // Arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // Act (actually do nothing as the constructor will be called automatically)
        fixture.detectChanges();

        // Assert
        expect(heroesComponent.heroes.length).toBe(3);
    })
});