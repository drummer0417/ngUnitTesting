import { HeroService } from "./hero.service";
import { TestBed } from "@angular/core/testing";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"

describe('HeroService', () => {

    let mockMessageService;
    let heroService: HeroService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageService }
            ]
        })

        heroService = TestBed.get(HeroService);
        httpTestingController = TestBed.get(HttpTestingController);
    })

    it('should getHero with correct url:', () => {

        // mockMessageService.add.and.returnValue();
        heroService.getHero(4).subscribe();
        // heroService.getHero(5).subscribe();

        //expect exactly one call is done to the given url
        const request = httpTestingController.expectOne('api/heroes/4');
        // check if it a GET request
        expect(request.request.method).toBe("GET");
       
        request.flush({id: 4, name: "Pietje", stregth: 44});

        // verify we get exactly what we expect => just one request with correct url
        httpTestingController.verify();
    })

    it('should postHero with correct url and postBody:', () => {

        let postBody = "{id: 2}";
        // mockMessageService.add.and.returnValue();
        heroService.postHero(postBody).subscribe();
        // heroService.getHero(5).subscribe();

        //expect exactly one call is done to the given url
        const request = httpTestingController.expectOne('api/heroes');
        // check Post method with body use: 
        expect(request.request.method).toBe("POST");
        expect(request.request.body).toBe("{id: 2}");
       
        request.flush({id: 4, name: "Pietje", stregth: 44});

        // verify we get exactly what we expect => just one request with correct url
        httpTestingController.verify();
    })
});