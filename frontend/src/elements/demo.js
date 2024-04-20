import { FaArrowRight} from "react-icons/fa";

const BranchLocater = () => {

  return (
    <>
    <div>
    <div className="scroll-to-top1 col-lg-3">
            <h6>Branch Locator</h6>
            <form action="" method="POST" id="blp_from" class="blp_from" name="blp_from">
           
            
                <div>
                <select id="sel_state" autocomplete="off" className="branch-list">
                <option value="">Select State</option>
                </select>
                <select  id="sel_city" autocomplete="off" className="branch-list1">
                    <option value="">Select City</option></select>
                    <button class="boxed-btn branch-btn" type="submit">
                            <FaArrowRight/>
                    </button>

                </div>
                
            
            </form>
        </div>
        </div>
    </>
  )
};

export default BranchLocater;