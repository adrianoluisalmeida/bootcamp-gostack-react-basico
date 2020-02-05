import React, {Component} from 'react';
import TechItem from './TechItem'
class TechList extends Component {

  state = {
    newTech: '',
    techs: []
  }

  //Executado assim que o component aparece em tela
  componentDidMount() {
    const techs = localStorage.getItem('techs');

    if(techs) {
      this.setState({techs: JSON.parse(techs)})
    }
  }

  //Executado sempre que houver alterações nas props ou estado
  //Param: Props e states antigos
  componentDidUpdate(_, prevState) { 
    if(prevState.techs !== this.state.techs){
      localStorage.setItem('techs', JSON.stringify(this.state.techs))
    }
  }

  //Executado quando o component deixa de existir
  componentWillMount(){

  }



  handleSubmit = e => {
    e.preventDefault();

    //estado é imutável
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ''
    })

    
  }

  //Precisa ser arrow function para usar o this
  handleInputChange = e => {
    this.setState({
      newTech: e.target.value
    })
  }

  handleDelete = (tech) => {
    this.setState({
      techs: this.state.techs.filter(t => t !== tech)
    })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{this.state.newTech}</h1>
        <ul>
          { this.state.techs.map(tech => (
           <TechItem key={tech} onDelete={() => this.handleDelete(tech)} tech={tech}/>
          )) }
          
        </ul>
        
        <input 
          type="text" 
          onChange={this.handleInputChange} 
          value={this.state.newTech} />
        <button type="submit">Enviar</button>
      </form>
    )
  }
}

export default TechList;