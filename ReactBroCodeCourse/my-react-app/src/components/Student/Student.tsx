import './Student.css'

type Props = {
 name?:string,
 age?: number,
 isStudent?: boolean
}


export const Student = ({name="Saleh", age=26, isStudent=true}: Props) => {
    
    return ( 
        <div className="student" >

            <p>Name: {name} </p>
            <p>Age: {age} </p>
            <p>Student: {isStudent ? "Yes" : "No"} </p>

        </div>
    );

}


