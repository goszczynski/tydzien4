import * as express from 'express';
import * as Foo from '../model/Foo';
import * as FoosModel from '../model/Foos';

export class Foos {
    private FooList : FoosModel.Foos;

    public static routes() : express.Router {
        let router : express.Router = express.Router();
        let FoosRoute : Foos = new Foos();

        router.get('/Foos/', FoosRoute.index.bind(FoosRoute));
        router.post('/Foos/', FoosRoute.create.bind(FoosRoute));
        router.put('/Foos/:Foo_id', FoosRoute.update.bind(FoosRoute));
        router.delete('/Foos/:Foo_id', FoosRoute.delete.bind(FoosRoute));
        router.get('/Foos/:Foo', FoosRoute.find.bind(FoosRoute));
        router.post('/Foos/delete/:Foo_id', FoosRoute.delete.bind(FoosRoute));
        router.post('/Foos/update/:Foo_id', FoosRoute.update.bind(FoosRoute));

        return router;
    }

    constructor() {
      this.FooList = new FoosModel.Foos([
            new Foo.Foo(1, 'I', 'ABC', 1),
            new Foo.Foo(2, 'II', 'DEF', 12),
            new Foo.Foo(3, 'III', 'GHI')
        ]);
    }

    public index(req : express.Request, res : express.Response) {
        res.json(this.FooList.list());
    }

    public create(req: express.Request, res: express.Response) {
        let FooCategory : string = req.body.category;
        let FooName : string = req.body.name;
        let FooPrice : number = parseInt(req.body.price) || 0;

        if (!FooName) {
            res.status(500).send('Foo name not found');
            return;
        }

        res.json(this.FooList.add(FooCategory, FooName, FooPrice));
    }

    public delete(req : express.Request, res : express.Response) {
        let FooId : number = parseInt(req.params.Foo_id);
        let wasDeleted : Boolean = this.FooList.delete(FooId);

        if (!wasDeleted) {
            res.status(404).send('Foo not found');
            return;
        } else {
            res.json({success: true});
        }
    }

    public update(req: express.Request, res: express.Response) {
        let FooId: number = parseInt(req.params.Foo_id);
        let Foo: Foo.Foo = this.FooList.fetch(FooId);
        let FooCategory: string = req.body.category;
        let FooName: string = req.body.name;
        let FooPrice: string = req.body.price;

        if (!Foo) {
            res.status(404).send('Foo not found');
            return;
        }

        if (FooCategory !== undefined) {
            Foo.category = FooCategory;
        }

        if (FooName !== undefined) {
            Foo.name = FooName;
        }

        if (FooPrice !== undefined) {
            Foo.price = parseInt(FooPrice, 10);
        }

        res.json(Foo);
    }

    public find(req : express.Request, res : express.Response) {
        let FooQuery : string = req.params.Foo;
        let Foo : Foo.Foo = this.FooList.find(FooQuery);

        if (!Foo) {
            res.status(404).send('Foo not found');
            return;
        }

        res.json(Foo);
    }
}