'use strict';
const menuButton=document.querySelector('#menu-toggle');
const nav=document.querySelector('#main-nav');
function closeMenu(){if(!nav||!menuButton)return;nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigatie');}
if(menuButton&&nav){
  menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Sluit navigatie':'Open navigatie');});
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
  document.addEventListener('click',event=>{if(!nav.contains(event.target)&&!menuButton.contains(event.target))closeMenu();});
  window.addEventListener('resize',()=>{if(window.innerWidth>680)closeMenu();});
}
const year=document.querySelector('#year');if(year)year.textContent=String(new Date().getFullYear());
const form=document.querySelector('#contact-form');
if(form){
  const status=document.querySelector('#form-status');
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const name=form.elements.namedItem('name').value.trim();
    const emailField=form.elements.namedItem('email');
    const subject=form.elements.namedItem('subject').value;
    const message=form.elements.namedItem('message').value.trim();
    const valid=name.length>=2&&emailField.validity.valid&&emailField.value.trim()!==''&&subject&&message.length>=10;
    status.className='form-status '+(valid?'success':'error');
    status.textContent=valid?'Demo geslaagd: alle velden zijn correct ingevuld. Er is geen bericht verzonden.':'Controleer de verplichte velden. Uw bericht moet minimaal 10 tekens bevatten.';
    if(valid)form.reset();
  });
}
