import { Hero } from "../hero";
import { HeroesComponent } from "./heroes.component";
import { of, Subject, Observable } from "rxjs";
import { HeroComponent } from "../hero/hero.component";

describe('HeroesComponent (Isolated tests)', () => {

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
        expect(heroesComponent.heroes[2]).toBeUndefined();
    })

    it('shouild call heroService.deleteHero with correct hero', () => {
        // Arrange
        heroesComponent.heroes = HEROES;
        mockHeroService.deleteHero.and.returnValue(of(true));
        
        // Act
        heroesComponent.delete(HEROES[1]);
        
        // Assert
        // check that delleteHero was called
        expect(mockHeroService.deleteHero).toHaveBeenCalled();
        // expect(mockHeroService.deleteHero).
        // or even better... check that delleteHero was called with the correct parameter
        expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[1]);
    })
    
    it('shouild call heroService.deleteHero returns an observable', () => {
        // Arrange
        heroesComponent.heroes = HEROES;
        mockHeroService.deleteHero.and.returnValue(of(true));
        
        // Act
        let result: any = mockHeroService.deleteHero(HEROES[1]);
        
        // Assert
        // check that delleteHero was called
        expect(result instanceof Observable).toBeTruthy();
    })
})