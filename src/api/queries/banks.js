export default `
	query ($id: Int, $filter: Json, $page: Int, $perpage: Int, $order: String) {
	  banks__pagination (_id: $id, _filter: $filter, _page: $page, _perpage: $perpage, _order: $order) {
	    total
	    per_page
	    last_page
	    current_page
	    data {
	      bank_name
	      bank_bic
	      bank_corr_account
	      description
	      created_at
	      updated_at
	      id
	      company_id
	      status_id
	      status {
	        id
	        name
	        code
	      }
	      company {
	      	id
	      	name
	      }
	    }
	  }
	}
`;