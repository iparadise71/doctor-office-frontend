import {DoctorModel} from './doctor.model';
import {PatientModel} from './patient.model';

export interface MedicalRecordModel {
  idMedicalRecord: number;
  description: string;
  date: string;
  prescriptionDrug: string;
  doctor?: DoctorModel;
  patient?: PatientModel;
}
