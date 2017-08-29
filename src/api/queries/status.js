export default `
	query ($table: String) {
	  status(table: $table) {
	    id
	    name
	    code
	  }
	}
`;