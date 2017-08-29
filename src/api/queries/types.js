export default `
	query ($table: String) {
	  types(table: $table) {
	    id
	    name
	    code
	  }
	}
`;