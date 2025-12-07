package scouting

import (
	"reflect"
	"testing"

	"github.com/go-co-op/gocron/v2"
	"github.com/google/uuid"
)

func Test_initializeScheduler(t *testing.T) {
	tests := []struct {
		name string
		want gocron.Scheduler
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := initializeScheduler(); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("initializeScheduler() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestShutDownScheduler(t *testing.T) {
	tests := []struct {
		name string
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ShutDownScheduler()
		})
	}
}

func TestAddScoutingJob(t *testing.T) {
	type args struct {
		location  string
		objective string
		interval  int
	}
	tests := []struct {
		name    string
		args    args
		want    uuid.UUID
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := AddScoutingJob(tt.args.location, tt.args.objective, tt.args.interval)
			if (err != nil) != tt.wantErr {
				t.Errorf("AddScoutingJob() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("AddScoutingJob() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestEditScoutingJob(t *testing.T) {
	type args struct {
		jobId     uuid.UUID
		location  string
		objective string
		interval  int
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := EditScoutingJob(tt.args.jobId, tt.args.location, tt.args.objective, tt.args.interval); (err != nil) != tt.wantErr {
				t.Errorf("EditScoutingJob() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func Test_createScoutTask(t *testing.T) {
	type args struct {
		location  string
		objective string
	}
	tests := []struct {
		name string
		args args
		want gocron.Task
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := createScoutTask(tt.args.location, tt.args.objective); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("createScoutTask() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestRemoveScoutingJob(t *testing.T) {
	type args struct {
		jobID uuid.UUID
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := RemoveScoutingJob(tt.args.jobID); (err != nil) != tt.wantErr {
				t.Errorf("RemoveScoutingJob() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
