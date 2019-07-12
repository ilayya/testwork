import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable({  providedIn: 'root'})
export class AppComponent {
  equipmentcost:number = 0;
  name:string;
  health: number;
  armor: number;
  attack: number;
  hero:any = [];
  heroHelmetImage:string;
  heroChestsImage:string;
  heroGlovesImage:string;
  heroBootsImage:string;
  heroSwordImage:string;
  backgroundImage:string;
  helmetChoosed:boolean = false;

    constructor(private http:HttpClient){

    this.http.get("/assets/hero.json")
        .subscribe((data) => {

          data.equipment.helmets.splice(0,0,{id:'0',name:"Нет",	price: "0",	armor: "0",	attack: "0",health: "0", img:""});
          data.equipment.chests.splice(0,0,{id:'0',name:"Нет",	price: "0",	armor: "0",	attack: "0",health: "0", img:""});
          data.equipment.gloves.splice(0,0,{id:'0',name:"Нет",	price: "0",	armor: "0",	attack: "0",health: "0", img:""});
          data.equipment.boots.splice(0,0,{id:'0',name:"Нет",	price: "0",	armor: "0",	attack: "0",health: "0", img:""});
          data.equipment.swords.splice(0,0,{id:'0',name:"Нет",	price: "0",	armor: "0",	attack: "0",health: "0", img:""});
          this.hero = data;
          this.name = this.hero.person.name;
          this.health = this.hero.person.health;
          this.armor = this.hero.person.armor;
          this.attack = this.hero.person.attack;
          this.backgroundImage = this.hero.person["img"];
          Pw.hero.health = this.hero.person.health;
          Pw.hero.armor = this.hero.person.armor;
          Pw.hero.attack = this.hero.person.attack;
          Pw.hero.price = 0;
        });


    }

    ngOnInit(){
      this.name = this.hero.person.name;
      this.health = this.hero.person.health;
      this.armor = this.hero.person.armor;
      this.attack = this.hero.person.attack;


      console.log(this.hero.equipment);

    }

    refresh(){
      this.health = Pw.calculateHealth();
      this.armor = Pw.calculateArmor();
      this.attack = Pw.calculateAttack();
      this.equipmentcost = Pw.calculatePrice();
    }

  selectHelmet(r){
    let index = r.target.options.selectedIndex;

    if (this.helmetChoosed == false){
      this.backgroundImage = this.hero.person["alt-img"];
      this.helmetChoosed = true;
    } else {
      if (this.hero.equipment.helmets[index].name == "Нет"){
        this.backgroundImage = this.hero.person.img;
        this.helmetChoosed = false;
      }
    }

    console.log(this.backgroundImage);

    Pw.helmets.health = this.hero.equipment.helmets[index].health;
    Pw.helmets.armor = this.hero.equipment.helmets[index].armor;
    Pw.helmets.attack = this.hero.equipment.helmets[index].attack;
    Pw.helmets.price = this.hero.equipment.helmets[index].price;
    this.heroHelmetImage = this.hero.equipment.helmets[index].img;
    this.refresh();
  }

  selectChest(r){
    let index = r.target.options.selectedIndex;
    Pw.chests.health = this.hero.equipment.chests[index].health;
    Pw.chests.armor = this.hero.equipment.chests[index].armor;
    Pw.chests.attack = this.hero.equipment.chests[index].attack;
    Pw.chests.price = this.hero.equipment.chests[index].price;
    this.heroChestsImage = this.hero.equipment.chests[index].img;
    this.refresh();
  }

  selectGlove(r){
    let index = r.target.options.selectedIndex;
    Pw.gloves.health = this.hero.equipment.gloves[index].health;
    Pw.gloves.armor = this.hero.equipment.gloves[index].armor;
    Pw.gloves.attack = this.hero.equipment.gloves[index].attack;
    Pw.gloves.price = this.hero.equipment.gloves[index].price;
    this.heroGlovesImage = this.hero.equipment.gloves[index].img;
    this.refresh();
  }

  selectBoot(r){
    let index = r.target.options.selectedIndex;
    Pw.boots.health = this.hero.equipment.boots[index].health;
    Pw.boots.armor = this.hero.equipment.boots[index].armor;
    Pw.boots.attack = this.hero.equipment.boots[index].attack;
    Pw.boots.price = this.hero.equipment.boots[index].price;
    this.heroBootsImage = this.hero.equipment.boots[index].img;
    this.refresh();
  }

  selectSword(r){
    let index = r.target.options.selectedIndex;
    Pw.swords.health = this.hero.equipment.swords[index].health;
    Pw.swords.armor = this.hero.equipment.swords[index].armor;
    Pw.swords.attack = this.hero.equipment.swords[index].attack;
    Pw.swords.price = this.hero.equipment.swords[index].price;
    this.heroSwordImage = this.hero.equipment.swords[index].img;
    this.refresh();
  }
}

export class Pw{
  static hero = {health:0,armor:0,attack:0,price:0};
  static helmets = {health:0,armor:0,attack:0,price:0};
  static chests = {health:0,armor:0,attack:0,price:0};
  static gloves = {health:0,armor:0,attack:0,price:0};
  static boots = {health:0,armor:0,attack:0,price:0};
  static swords = {health:0,armor:0,attack:0,price:0};

  static calculateHealth(){
    return Number(Pw.hero.health)
    + Number(Pw.helmets.health)
    + Number(Pw.chests.health)
    + Number(Pw.gloves.health)
    + Number(Pw.boots.health)
    + Number(Pw.swords.health);
  }

  static calculateArmor(){
    return Number(Pw.hero.armor)
    + Number(Pw.helmets.armor)
    + Number(Pw.chests.armor)
    + Number(Pw.gloves.armor)
    + Number(Pw.boots.armor)
    + Number(Pw.swords.armor);
  }

  static calculateAttack(){
    return Number(Pw.hero.attack)
    + Number(Pw.helmets.attack)
    + Number(Pw.chests.attack)
    + Number(Pw.gloves.attack)
    + Number(Pw.boots.attack)
    + Number(Pw.swords.attack);
  }

  static calculatePrice(){
    return Number(Pw.hero.price)
    + Number(Pw.helmets.price)
    + Number(Pw.chests.price)
    + Number(Pw.gloves.price)
    + Number(Pw.boots.price)
    + Number(Pw.swords.price);
  }
}
