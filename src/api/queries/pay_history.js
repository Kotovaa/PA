export default `
	query ($id: Int, $filter: Json, $page: Int, $perpage: Int, $order: String) {
	  pay_history__pagination (_id: $id, _filter: $filter, _page: $page, _perpage: $perpage, _order: $order) {
	    total
	    last_page
	    current_page
	    per_page
	    data {
	      id
	      datetime
	      value
	      currency_id
	      currency {
	        id
	        name
	      }
	      description
	      bank_account_id
	      bank_account {
	        id
	        name
	      }
	      status_id
	      status {
	        id
	        name
	        code
	      }
	      from_pay_account_id
	      to_pay_account_id
	      blocked_flag
	      to_check_flag
	      transaction_type_id
	      transaction_type {
	        id
	        name
	      }
	      payment_purpose
	      bank_document_id
	      a24_tariff_id
	      a24_tariff {
	        id
	        name
	      }
	    }
	  }
	}
`;