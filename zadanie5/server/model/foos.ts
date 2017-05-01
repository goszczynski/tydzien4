import {Foo} from './foo';

export class Foos {
    private foosList : Array<Foo>;

    constructor(foos : Array<Foo> = []) {
        this.foosList = new Array<Foo>();

        foos.forEach(
            (foo) => this.foosList.push(foo)
        );
    }

    public list() : Array<Foo> {
        return this.foosList;
    }

    public add(fooCategory: string, fooName: string, fooPrice: number) : Array<Foo>  {
        let fooIds : Array<number> = this.foosList.map(
            (foo) => foo.id
        );
        let fooId : number = Math.max(...fooIds) + 1;

        let foo = new Foo(fooId, fooCategory, fooName, fooPrice);

        this.foosList.push(foo);

        return this.foosList;
    }

    public delete(fooId : number) : Boolean {
        let deleted : Boolean = false;

        this.foosList = this.foosList.filter(
            (foo : Foo) => {
                deleted = deleted || foo.id === fooId;
                return foo.id !== fooId;
            }
        );

        return deleted;
    }

    public fetch(fooId : number) : Foo {
        return fooId && this.foosList.filter(
            (foo : Foo) => foo.id === fooId
        ).shift();
    }

    public find(fooQuery : string) : Foo {
        let fooId : number = parseInt(fooQuery);
        fooQuery = fooQuery.toLowerCase();

        return this.foosList.filter(
            (foo : Foo) => foo.id === fooId
                || foo.name.toLowerCase() === fooQuery
        ).shift();
    }
}