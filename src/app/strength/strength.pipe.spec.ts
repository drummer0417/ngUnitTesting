import { StrengthPipe } from "./strength.pipe";

describe('Strength pipe', () => {

    it('should return "4 (weak)" if strength is 4', () => {

        let strength = new StrengthPipe();

        expect(strength.transform(4)).toBe('4 (weak)');
    });

    it('should return "10 (strong)" if strength is 10', () => {

        let strength = new StrengthPipe();

        expect(strength.transform(10)).toBe('10 (strong)');
    });

    it('should return "30 (unbelievable)" if strength is 30', () => {

        let strength = new StrengthPipe();

        expect(strength.transform(30)).toBe('30 (unbelievable)');
    });
})