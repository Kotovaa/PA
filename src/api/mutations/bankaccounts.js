export default `
	mutation ($id: Int, $name: String, $account_number: String, $bank_id: Int, $currency_id: Int, $description: String, $status_id: Int, $legal_entity_id: Int) {
	    admins__bank_account (id: $id, name: $name, account_number: $account_number, bank_id: $bank_id, currency_id: $currency_id, description: $description, status_id: $status_id, legal_entity_id: $legal_entity_id) {
	        id
	        name
	        account_number
	        bank_id
	        currency_id
	        description
	        status_id
	        legal_entity_id
	    }
  	}
`