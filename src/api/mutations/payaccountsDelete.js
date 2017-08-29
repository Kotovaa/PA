export default `
	mutation ($id: Int, $removable: Boolean) {
	    admins__pay_account_mutation (id: $id, removable: $removable) {
	        id
	    }
  	}
`