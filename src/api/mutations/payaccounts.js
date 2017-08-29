export default `
	mutation ($id: Int, $currency_id: Int, $status_id: Int, $company_id: Int) {
	    admins__pay_account_mutation (id: $id, currency_id: $currency_id, status_id: $status_id, company_id: $company_id) {
	        id
	        currency_id
	        status_id
	        company_id
	    }
  	}
`