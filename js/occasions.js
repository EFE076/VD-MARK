'use strict';
// Voorbeeldvoorraad: voertuigen en prijzen zijn fictief.
const cars=[
{brand:'Volkswagen',model:'Polo',year:2009,km:178000,price:2950},
{brand:'Toyota',model:'Aygo',year:2011,km:143000,price:3250},
{brand:'Ford',model:'Fiesta',year:2008,km:192000,price:1950},
{brand:'Opel',model:'Corsa',year:2010,km:165000,price:2750},
{brand:'Peugeot',model:'107',year:2007,km:187000,price:1450},
{brand:'Renault',model:'Clio',year:2012,km:154000,price:3950}
];
const search=document.querySelector('#car-search');
const brand=document.querySelector('#brand-filter');
const price=document.querySelector('#price-filter');
const sort=document.querySelector('#sort-filter');
const grid=document.querySelector('#car-grid');
const count=document.querySelector('#results-count');
const empty=document.querySelector('#no-results');
const euro=value=>new Intl.NumberFormat('nl-NL',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(value);
const number=value=>new Intl.NumberFormat('nl-NL').format(value);
if(search&&brand&&price&&sort&&grid&&count&&empty){
  [...new Set(cars.map(car=>car.brand))].sort((a,b)=>a.localeCompare(b,'nl')).forEach(name=>{
    const option=document.createElement('option');option.value=name;option.textContent=name;brand.appendChild(option);
  });
  function render(){
    const query=search.value.trim().toLocaleLowerCase('nl');
    const results=cars.filter(car=>(car.brand+' '+car.model).toLocaleLowerCase('nl').includes(query)&&(!brand.value||car.brand===brand.value)&&(!price.value||car.price<=Number(price.value)));
    const order={'price-asc':(a,b)=>a.price-b.price,'price-desc':(a,b)=>b.price-a.price,'year-desc':(a,b)=>b.year-a.year};
    if(order[sort.value])results.sort(order[sort.value]);
    const fragment=document.createDocumentFragment();
    results.forEach(car=>{
      const card=document.createElement('article');card.className='car-card';
      card.innerHTML='<div class="car-image car-placeholder"><div class="car-placeholder-content"><span class="car-placeholder-icon" aria-hidden="true">▰</span><strong>VOORBEELDVOERTUIG</strong><small>Geen echte voertuigfoto beschikbaar</small></div><span>DEMO</span></div><div class="car-body"><h3></h3><div class="car-meta"></div><div class="car-bottom"><strong class="car-price"></strong><a href="contact.html">Vraag informatie ↗</a></div></div>';
      card.querySelector('h3').textContent=car.brand+' '+car.model;
      const meta=card.querySelector('.car-meta');
      [String(car.year),number(car.km)+' km','Fictieve gegevens'].forEach(value=>{const item=document.createElement('span');item.textContent=value;meta.appendChild(item);});
      card.querySelector('.car-price').textContent=euro(car.price);
      fragment.appendChild(card);
    });
    grid.replaceChildren(fragment);
    count.textContent=results.length+' demo-auto'+(results.length===1?'':'’s');
    empty.hidden=results.length!==0;
  }
  [search,brand,price,sort].forEach(control=>control.addEventListener(control===search?'input':'change',render));
  render();
}
