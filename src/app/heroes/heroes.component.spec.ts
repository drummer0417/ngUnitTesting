import { Hero } from "../hero";
import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";

describe('HeroesComponent', () => {

    let heroesComponent: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'pietje', strength: 25 },
            { id: 2, name: 'jantje', strength: 75 },
            { id: 3, name: 'klaasje', strength: 10 }   
        ]
        mockHeroService = jasmine.createSpyObj(['addHero', 'getHeroes', 'deleteHero'])

        heroesComponent = new HeroesComponent(mockHeroService);
    });

    it('should delete a hero', () => {
        // Arrange: init HEROES: is already done by beforeEach
        heroesComponent.heroes = HEROES;
        // make the mockHeroService.delete retrurn a observable
        mockHeroService.deleteHero.and.returnValue(of(true));

        // Act: delete a hero
        heroesComponent.delete(HEROES[2]);

        // Assert: HEROES contains two elements now
        expect(heroesComponent.heroes.length).toBe(2);
        expect(heroesComponent.heroes[0].id).toBe(1);
        expect(heroesComponent.heroes[1].id).toBe(2);
    })
})