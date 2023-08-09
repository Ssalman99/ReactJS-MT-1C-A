import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './App.css'

// Replace your code here

class App extends Component {
  state = {isLoading: true, blogsData: []}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch(`https://apis.ccbp.in/tg/packages`)
    const data = await response.json()

    const updateList = data.packages.map(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.image_url,
      description: each.description,
    }))

    this.setState({blogsData: updateList, isLoading: false})
  }

  render() {
    const {isLoading, blogsData} = this.state

    return (
      <div className="app-container">
        <div className="line-container">
          <div>
            <h1 className="heading">Travel Guide</h1>
            <hr className="line" />
          </div>
        </div>

        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="list-container">
            {blogsData.map(each => (
              <li className="list-item" key={each.name}>
                <img src={each.imageUrl} className="image" alt={each.name} />
                <div className="text-container">
                  <h1 className="list-heading">{each.name}</h1>
                  <p className="description">{each.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default App
