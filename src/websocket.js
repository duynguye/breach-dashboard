class Hello extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            text: 'Loading...'
        };
    }

    componentDidMount () {
        const socket = new WebSocket('ws://localhost:5000');
        
        socket.onopen = (event) => {
            socket.send('Hello from React!');
        }
        
        socket.onmessage = (event) => {
            this.setState({
                text: event.data
            });
        }

        socket.onclose = (event) => {
            console.log(event);

            this.setState({
                text: 'Connection closed by server...'
            });
        }
    }

    render () {
        return (
            <div>
                <h1>{this.state.text}</h1>
            </div>
        );
    }
}