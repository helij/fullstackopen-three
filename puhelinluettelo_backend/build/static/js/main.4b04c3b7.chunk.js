(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,n){e.exports=n(42)},40:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(10),u=n.n(l),s=n(11),i=n(12),o=n(14),c=n(13),m=n(15),d=function(e){return r.a.createElement("div",null,"rajaa n\xe4ytett\xe4vi\xe4: ",r.a.createElement("input",{value:e.value,onChange:e.change}))},h=function(e){return e.persons.filter(function(t){return t.name.toUpperCase().includes(e.filter.toUpperCase())}).map(function(t){return r.a.createElement("form",{key:t.name,onSubmit:function(n){return e.handleDelete(n,t)}},r.a.createElement("table",{key:t.name},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,t.name),r.a.createElement("td",null,t.number),r.a.createElement("td",null,r.a.createElement("button",{type:"submit"},"poista"))))))})},f=function(e){var t=e.message,n=e.style;return null===t?null:r.a.createElement("div",{className:n},t)},p=n(2),v=n.n(p),E="/api/persons",b={getAll:function(){return v.a.get(E).then(function(e){return e.data})},create:function(e){return v.a.post(E,e).then(function(e){return e.data})},update:function(e,t){return v.a.put("".concat(E,"/").concat(e),t).then(function(e){return e.data})},deletePerson:function(e){return v.a.delete("".concat(E,"/").concat(e)).then(function(e){return e.data})}},g=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(o.a)(this,Object(c.a)(t).call(this,e))).addPerson=function(e){if(e.preventDefault(),n.state.persons.map(function(e){return e.name}).includes(n.state.newName)){if(window.confirm(n.state.newName+" on jo luettelossa, korvataanko vanha numero uudella?")){var t=n.state.persons.find(function(e){return e.name===n.state.newName});t.number=n.state.newNumber,b.update(t.id,t).then(function(e){var a=n.state.persons.filter(function(e){return e.name!==n.state.newName}).concat(e);n.setState({persons:a,changed:"henkil\xf6n '".concat(t.name,"' uusi numero on '").concat(t.number,"' ")})}).catch(function(e){alert("henkil\xf6 '".concat(t.name,"' on jo valitettavasti poistettu palvelimelta")),n.setState({persons:n.state.persons.filter(function(e){return e.name!==n.state.newName})})}),setTimeout(function(){n.setState({changed:null})},5e3)}}else{var a={name:n.state.newName,number:n.state.newNumber};b.create(a).then(function(e){var t=n.state.persons.concat(e);n.setState({persons:t,added:"lis\xe4ttiin '".concat(n.state.newName,"' ")}),setTimeout(function(){n.setState({added:null})},5e3)})}},n.handleDelete=function(e,t){e.preventDefault(),window.confirm("poistetaanko "+t.name)&&b.deletePerson(t.id).then(function(e){var a=n.state.persons.filter(function(e){return e.id!==t.id});n.setState({persons:a,removed:"poistettiin '".concat(t.name,"' ")}),setTimeout(function(){n.setState({removed:null})},5e3)})},n.handleNameChange=function(e){n.setState({newName:e.target.value})},n.handleNumberChange=function(e){n.setState({newNumber:e.target.value})},n.handleFilter=function(e){n.setState({filter:e.target.value})},n.state={persons:[],newName:"",newNumber:"",filter:"",added:null,removed:null,changed:null},n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;b.getAll().then(function(t){e.setState({persons:t})})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement("p",null,"Jos poistat jonkun henkil\xf6n toisesta selaimesta hieman ennen kun yrit\xe4t muuttaa henkil\xf6n numeroa toisesta selaimesta, tapahtuu virhetilanne:"),r.a.createElement(f,{message:this.state.added,style:"added"}),r.a.createElement(f,{message:this.state.removed,style:"removed"}),r.a.createElement(f,{message:this.state.changed,style:"changed"}),r.a.createElement(d,{value:this.state.filter,change:this.handleFilter}),r.a.createElement("h2",null,"Lis\xe4\xe4 uusi / muuta olemassaolevan numeroa"),r.a.createElement("form",{onSubmit:this.addPerson},r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{value:this.state.newName,onChange:this.handleNameChange})),r.a.createElement("div",null,"numero: ",r.a.createElement("input",{value:this.state.newNumber,onChange:this.handleNumberChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4"))),r.a.createElement("h2",null,"Numerot"),r.a.createElement(h,{persons:this.state.persons,filter:this.state.filter,handleDelete:this.handleDelete}))}}]),t}(r.a.Component);n(40);u.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[16,2,1]]]);
//# sourceMappingURL=main.4b04c3b7.chunk.js.map