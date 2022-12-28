import { Input, Label, Textarea,Select} from '@windmill/react-ui';

const AssignCourse = () =>{


    return(
      <div>
        <h1>Assign Course</h1>
        <Label className="mt-4 ">
          <span>Course Category</span>
          <Input></Input>
      </Label>

      <Label className="mt-4 ">
          <span>Course</span>
          <Input></Input>
      </Label>

      <Label className="mt-4 ">
          <span>Batch</span>
          <Input></Input>
      </Label>
      </div>
    );
}

export default AssignCourse;