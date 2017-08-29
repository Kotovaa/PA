export default `
	mutation ($id: Int, $removable: Boolean) {
	    admins__bank_account (id: $id, removable: $removable) {
	        id
	    }
  	}
`