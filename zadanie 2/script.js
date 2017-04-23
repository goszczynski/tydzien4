

class EventEmitter() {
    
    constructor() {
       this.events = {}; 
    }

    on(type, fn) {

        if (!type || !fn) return;

        this.events[type] = this.events[type] || [];
        this.events[type].push(fn);

    }


    emit(type, data) {

        let fns = this.events[type];

        if (!fns || !fns.length) return;

        for (let i = 0; i < fns.length; i++) {
            fns[i](data);
        }

    }

}

class Database extends EventEmitter {
    
    constructor(url) {
        super();
        this.url = url;
    }

    connect() {
        this.emit("connect", this.url);
    }

    disconnect() {
    this.emit("disconnect", this.url);
    }
}


// Użycie EventEmittera
let ev = new EventEmitter();

ev.on("hello", (message) => {
    console.log("Witaj " + message + "!");
});


ev.on("hello", (message) => {
    console.log("Siema " + message + ".");
});

ev.on("goodbye", () => {
    console.log("Do widzenia!");
});

ev.emit("hello", "Marek");
ev.emit("goodbye");
ev.emit("custom"); // nic się nie wydarzy

// DO ZROBIENIA!
// Docelowe użycie klasy Database
const url = "db://localhost:3000";

let db = new Database(url); // fikcyjny adres

db.on("connect", (url) => {
    console.log("Połączenie z bazą pod adresem " + url + "zostało ustanowione.");
});

db.on("disconnect", (url) => {
    console.log("Połączenie z bazą pod adresem " + url + "zostało zakończone.");
});

db.connect();

// po 5 sekundach rozłączamy się
setTimeout(() => {
    db.disconnect();
}, 5000);