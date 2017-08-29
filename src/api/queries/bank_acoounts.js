export default `
	query ($id: Int, $filter: Json, $page: Int, $perpage: Int, $order: String) {
	  bank_accounts__pagination (_id: $id, _filter: $filter, _page: $page, _perpage: $perpage, _order: $order) {
	    total
	    per_page
	    last_page
	    current_page
	    data {
	      name
	      description
	      account_number
	      id
	      bank_id
	      bank {
	      	id
	      	bank_name
	      }
	      status_id
	      status {
	      	id
	      	name
	      	code
	      }
	      currency_id
	      currency {
	      	id
	      	name
	      }
	      legal_entity_id
	      legal_entity {
	      	id
	      	name
	      }
	    }
	  }
	}
`;