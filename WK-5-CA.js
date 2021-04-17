// Create a menu app as seen in this week’s video. What you create is up to you 
// as long as it meets the following requirements:

// a.	Use at least one array
// b.	Use at least two classes
// c.	Your menu should have the options to create, view, 
//      and delete elements

class Child {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    describe() {
        return `${this.name} is ${this.age} years old.`
    }
}
class Daycare {
    constructor(name) {
        this.name = name;
        this.children = [];
    }

    addChild(child) {
        if (child instanceof Child) {
            this.children.push(child);
        } else {
            throw new Error(`You have to add an instance of Child: ${child} is not a child`);
        }
    }

    describe() {
        return `We need ${this.children.length} from ${this.name}.`;
    }
}

class Menu {
    constructor() {
        this.daycares = [];
        this.selectedStore = null;
    }
    start() {
        let selection = this.showMainMenuOptions();
        while (selection !=0) {
            switch (selection) {
                case "1":
                    this.createDaycare();
                    break;
                case "2":
                    this.displayDaycares();
                    break;
                case "3":
                    this.deleteDaycare();
                    break;
                case "4":
                    this.viewChildRoster();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert("Thank you for choosing us to help with your childcare needs.")
    }


    showMainMenuOptions() {
        return prompt(`
        Done Adding? Enter 0
        To create a new daycare, Enter 1
        To view daycares, Enter 2
        To delete a daycare, Enter 3
        To view a child roster, Enter 4
        `);
    }

    showDaycareMenuOptions(daycareInfo) {
        return prompt(`
        To go back, Enter 0
        To create a child, Enter 1
        to delete a child, Enter 2
        -------------------------
        ${daycareInfo}
        `)
    }

    displayDaycares() {
        let daycareString = "";
        for (let i = 0; i < this.daycares.length; i++) {
            daycareString += i + ")" + this.daycares[i].name + "\n";
        }

        let index = prompt(daycareString + "\n" + "Enter the index of the daycare you'd like to view:");
        if (index > -1 && index < this.daycares.length) {
            this.selectedDaycare = this.daycares[index];
            let description =
            "Daycare Name: " + this.selectedDaycare.name + "\n";

        for (let i = 0; i < this.selectedDaycare.children.length; i++) {
            description += i + ") " + this.selectedDaycare.children[i].name
            + " - " + this.selectedDaycare.children[i].age + "\n";
        }

        let selection = this.showDaycareMenuOptions(description);
            switch (selection) {
                case "1":
                    this.createChild();
                    break;
                case "2":
                    this.deleteChild();
            }
        }
    }

    createDaycare() {
        let name = prompt(`Enter the name of the new daycare`);
        this.daycares.push(new Daycare(name));
    }

    viewChildRoster() {

         let childRosterString = "";

        for (let i = 0; i < this.daycares.length; i++) {
            childRosterString += i + ") " + this.daycares[i].name + "\n"

            for (let j = 0; j < this.daycares[i].children.length; j++) {
                let currentDaycare = this.daycares[i];
                    let child = currentDaycare.children[j];
                    childRosterString += child.name + " - " +
                    child.age + "\n"
            }  
        }

        alert(`These are the children signed up for daycare:`
        + `\n` + childRoster);
    }

    deleteDaycare() {
        let index = prompt("Enter the index of the daycare to delete:");
        if (index > -1 && index < this.daycares.length) {
            this.daycares.splice(index, 1);
        }
    }

    createChild() {
        let name = prompt("Enter new child's name:");
        let age = prompt("Enter the child's age:");
        this.selectedDaycare.children.push(new Child(name, age));
    }

    deleteChild() {
        let index = prompt("Enter the index of the child being removed:");
        if (index > -1 && index < this.selectedDaycare.children.length) {
            this.selectedDaycare.children.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();