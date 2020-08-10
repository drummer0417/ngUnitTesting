import { TestBed, ComponentFixture, fakeAsync, tick, flush } from "@angular/core/testing";
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

    fit('should call updateHero when save is called (with done)', (done) => {

        mockHeroService.getHero.and.returnValue(of({ id: 1, name: "pietje", strength: 33 }));
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        setTimeout(() => {
            expect(mockHeroService.updateHero).toHaveBeenCalled();
            done();
        }, 300)
    })

    fit('should call updateHero when save is called (with done)', fakeAsync(() => {

        mockHeroService.getHero.and.returnValue(of({ id: 1, name: "pietje", strength: 33 }));
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        
        flush(); // or tick(250);
        expect(mockHeroService.updateHero).toHaveBeenCalled();
    }))
})
