export default `
	mutation ($id: Int, $removable: Boolean) {
	    admins__bank (id: $id, removable: $removable) {
	        id
	    }
  	}
`