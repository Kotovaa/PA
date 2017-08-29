export default `
	query ($id: Int, $filter: Json, $page: Int, $perpage: Int, $order: String) {
	  pay_accounts__pagination (_id: $id, _filter: $filter, _page: $page, _perpage: $perpage, _order: $order) {
	    total
	    last_page
	    current_page
	    per_page
	    data {
	      id
	      status_id
	      status {
	        id
	        name
	        code
	      }
	      account_number_in_a24
	      end_balance
	      last_pay_history_id
	      last_pay_history {
	        id
	        datetime
	      }
	      currency_id
	      currency {
	        id
	        name
	      }
	      company_id
	      company {
	      	id
	      	name
	      }
	      created_at
	      updated_at
	    }
	  }
	}
`;