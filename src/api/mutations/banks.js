export default `
	mutation ($id: Int, $bank_name: String, $bank_bic: String, $bank_corr_account: String, $company_id: Int, $description: String, $status_id: Int) {
	    admins__bank (id: $id, bank_name: $bank_name, bank_bic: $bank_bic, bank_corr_account: $bank_corr_account, company_id: $company_id, description: $description, status_id: $status_id) {
	        id
	        bank_name
	        bank_bic
	        bank_corr_account
	        company_id
	        description
	        status_id
	    }
  	}
`