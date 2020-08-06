import './style';
import { Component } from 'preact';
import axios from 'axios';

export default class App extends Component {
	state = {
		productName: '',
		productType: '',
		productPrice: 0,
		customerFirstName: '',
		customerLastName: '',
		customerEmail: '',
		customerPhone: '',
		onPay: true,
		trxToken: ''
	};

	handlePay = () => {
		snap.pay(this.state.trxToken)
	}

	onSubmit = e => {
		e.preventDefault();

		const content = this.state

		axios.post(
			'http://localhost:4000',
			content,
			{
				headers:
					{ 'Content-Type': 'application/json' }
			}
		).then(response => {
			const resp = response.data

			this.setState({
				...this.state,
				onPay: false,
				trxToken: resp.transactionToken
			})
		})
	}

	onInput = e => {
		const { value, name } = e.target;

		let addedState = {}
		addedState[name] = value

		this.setState({
			...this.state,
			...addedState,
		})
	}

	render(_, {
		productName,
		productType,
		productPrice,
		customerFirstName,
		customerLastName,
		customerEmail,
		customerPhone,
	}) {
		return (
			<div>
				{
					this.state.onPay ?
						<form onSubmit={this.onSubmit}>
							<p>Product Name</p>
							<input type="text" value={productName} onInput={this.onInput} name="productName" />

							<p>Product Type</p>
							<input type="text" value={productType} onInput={this.onInput} name="productType" />

							<p>Product Price</p>
							<input type="number" value={productPrice} onInput={this.onInput} name="productPrice" />

							<p>Customer First Name</p>
							<input type="text" value={customerFirstName} onInput={this.onInput} name="customerFirstName" />

							<p>Customer Last Name</p>
							<input type="text" value={customerLastName} onInput={this.onInput} name="customerLastName" />

							<p>Customer Email</p>
							<input type="text" value={customerEmail} onInput={this.onInput} name="customerEmail" />

							<p>Customer Phone</p>
							<input type="text" value={customerPhone} onInput={this.onInput} name="customerPhone" />

							<div>
								<button type="submit">Submit</button>
							</div>
						</form> :
						<button id="pay-button" onClick={() => this.handlePay()}>Pay!</button>

				}
			</div>
		);
	}
}
