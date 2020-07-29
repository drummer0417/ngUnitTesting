import { TestBed, ComponentFixture } from "@angular/core/testing"
import { HeroComponent } from "./hero.component"
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('HeroComponent (Shallow)', () => {

    let fixture: ComponentFixture<HeroComponent>;
    let heroComponent;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroComponent);
        heroComponent = fixture.componentInstance;
    })

    it('should have the correct hero', () => {

        heroComponent.hero = { id: 1, name: "SuperJantje", strength: 44 };

        expect(heroComponent.hero.id).toEqual(1);
    })

    it('should render the hero name in the <a> tag', () => {
        heroComponent.hero = { id: 1, name: "SuperJantje", strength: 44 };
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('a').textContent).toContain('Super')
        // or 
        expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('Jantje')
        // or
        let debugElementA = fixture.debugElement.query(By.css('a'));
        expect(debugElementA.nativeElement.textContent).toContain('Jantje')
    })
})