import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from "@angular/common";
import { HeroDetailComponent } from "./hero-detail.component";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe("HeroDetailService", () => {

    let mockActivatedRoute;
    let mockHeroService;
    let mockLocation;
    let fixture: ComponentFixture<HeroDetailComponent>;

    beforeEach(() => {

        mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
        mockLocation = jasmine.createSpyObj(["back"]);
        mockActivatedRoute = {
            snapshot: { paramMap: { get: () => { return "1234"; } } }
        }

        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                HeroDetailComponent
            ],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: HeroService, useValue: mockHeroService },
                { provide: Location, useValue: mockLocation }
            ],
        })

        fixture = TestBed.createComponent(HeroDetailComponent);
    })

    it('should render hero name in H2 tag', () => {

        mockHeroService.getHero.and.returnValue(of({ id: 1, name: "hans", strength: 32 }));

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain("HANS");
    })
})
